<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span='12'>
        <a-button class="mr5" type='primary'><a-icon type="reload" /> 刷新数据</a-button>
        <a-button class="mr5" @click="show.edit=true"><a-icon type="plus" /> 添加用户</a-button>
        <a-button class="mr5" :disabled='selectedRows.length==0'><a-icon type="pause-circle" /> 封禁</a-button>
        <a-button class="mr5" :disabled='selectedRows.length==0'><a-icon type="check-circle" /> 解禁</a-button>
        <a-button class="mr5" :disabled='selectedRows.length==0'><a-icon type="delete" /> 删除</a-button>
      </a-col>
      <a-col class="tr" :span='12'>
        <a-input-group compact>
          <a-select defaultValue="name">
            <a-select-option value="name">姓名</a-select-option>
            <a-select-option value="username">用户名</a-select-option>
            <a-select-option value="phone">手机号码</a-select-option>
          </a-select>
          <a-input style="width: 300px" placeholder="输入搜索关键字"/>
        </a-input-group>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>
    <user-edit v-if="show.edit" @cancel="(reload)=>{show.edit=false;}"/>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getOrgTree, getServiceList } from '@/api/manage'
import UserEdit from './Edit';
import commonMixins from '@/mixins/common'
export default {
  name: 'TreeList',
  mixins:[commonMixins],
  components: {
    STable,
    STree,
    UserEdit
  },
  data () {
    return {
      show:{
        edit:false
      },
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'no'
        },
        {
          title: '用户名',
          dataIndex: 'description'
        },
        // {
        //   title: '姓名',
        //   dataIndex: 'description'
        // },
        // {
        //   title: '部门',
        //   dataIndex: 'description'
        // },
        // {
        //   title: '职位',
        //   dataIndex: 'description'
        // },
        // {
        //   title: '电话',
        //   dataIndex: 'description'
        // },
        {
          title: '状态',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
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
