<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span='12'>
        <a-button class="mr5" type='primary'><a-icon type="reload" /> 刷新数据</a-button>
        <a-button class="mr5" @click="show.edit=true"><a-icon type="plus" /> 添加字典</a-button>
        <a-button class="mr5" :disabled='selectedRows.length==0'><a-icon type="delete" /> 删除</a-button>
      </a-col>
      <a-col class="tr" :span='12'>
        <a-input-group compact>
          <a-select defaultValue="name">
            <a-select-option value="name">字典名称</a-select-option>
            <a-select-option value="status">字典编码</a-select-option>
            <a-select-option value="id">ID</a-select-option>
          </a-select>
          <a-input style="width: 300px" placeholder="输入搜索关键字"/>
        </a-input-group>
      </a-col>
    </a-row>
    <a-divider/>
    <a-row>
      <a-col :span="24">
        <a-table bordered
          ref="table"
          :columns="columns"
          :alert="false"
          :dataSource="res.records"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
        <span slot="status" slot-scope="text, record">
          <a-tag :color="record.status ? 'green':'red'">{{record.status ? '正常':'停用'}}</a-tag>
        </span>
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
      queryParam: {},
      res:{
        records:[{key:1,id:'1',name:'性别',alias:'GENDER',status:true,note:'无'}]
      },
      columns: [
        {title: '#',dataIndex: 'id'},
        {title: '字典名称',dataIndex: 'name'},
        {title: '字典编码',dataIndex: 'alias'},
        {title: '备注',dataIndex: 'note'},
        {title: '状态',dataIndex: 'status',scopedSlots: { customRender: 'status' }},
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    
  },
  methods: {
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
