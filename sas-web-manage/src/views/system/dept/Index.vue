<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span='12'>
        <a-button class="mr5" type='primary'><a-icon type="reload" /> 刷新数据</a-button>
        <a-button class="mr5" @click="show.edit=true"><a-icon type="plus" /> 添加部门</a-button>
        <a-button class="mr5" :disabled='selectedRows.length==0'><a-icon type="delete" /> 删除</a-button>
      </a-col>
      <a-col class="tr" :span='12'>
        <a-input-group compact>
          <a-select defaultValue="name">
            <a-select-option value="name">部门名称</a-select-option>
            <a-select-option value="all">部门全称</a-select-option>
            <a-select-option value="note">备注</a-select-option>
          </a-select>
          <a-input style="width: 300px" placeholder="输入搜索关键字"/>
        </a-input-group>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row :gutter="8">
      <a-col :span="4">
        <a-tree 
          :treeData="treeData"
          showIcon
          defaultExpandAll
          :defaultSelectedKeys="['0-0-0']"
        >
          <a-icon slot="folder" type="folder" />
          <template slot="custom" slot-scope="{selected}">
            <a-icon :type="selected ? 'frown':'frown-o'" />
          </template>
        </a-tree>
      </a-col>
      <a-col :span="20">
        <a-table
          ref="table" bordered
          :columns="columns"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" v-if="$auth('table.delete')"/>
            </template>
            <a-dropdown v-if="$auth('table.delete')">
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item v-if="$auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <edit v-if="show.edit" @cancel="(reload)=>{show.edit=false;}"/>
  </a-card>
</template>

<script>
import Edit from './Edit';
import commonMixins from '@/mixins/common'
const treeData = [{
  title: '顶级部门',
  key: '0-0',
  slots: {
    icon: 'folder',
  },
  children: [
    { title: '财务部', key: '0-0-0', slots: { icon: 'folder' }},
    { title: '商务部', key: '0-0-1', scopedSlots: { icon: 'folder' },children:[
      { title: '商务一部', key: '2', slots: { icon: 'folder' }},
    ]} ],
}]
export default {
  name: 'TreeList',
  mixins:[commonMixins],
  components: {
    Edit
  },
  data () {
    return {
      show:{
        edit:false
      },
      treeData:treeData,
      queryParam: {},
      columns: [
        {title: '#',dataIndex: 'id'},
        {title: '部门名称',dataIndex: 'name'},
        {title: '全称',dataIndex: 'all'},
        {title: '备注',dataIndex: 'note'},
        {title: '排序',dataIndex: 'sort',sorter: true},
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  methods: {
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
