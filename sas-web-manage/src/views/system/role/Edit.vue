<template>
    <div>
        <a-modal v-model="v" :title="`${type=='add' ? '添加':'编辑'}角色`" :maskClosable="false" :keyboard="false"
            :closable="false" width="70%">
            <a-form :form="form" @submit="handleSubmit">
            <div>
                    <a-row :gutter="10">
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="角色名称" >
                                <a-input
                                    v-decorator="[
                                    'name',
                                    {
                                        rules: [{
                                        required: true, message: '角色名称不能为空！',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="角色别名" >
                                <a-input
                                    v-decorator="[
                                    'alias',
                                    {
                                        rules: [{
                                        required: true, message: '角色别名不能为空',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="排序" help="数值越小排序越靠前，范围-9999~9999">
                                <a-input-number :max="9999" :min="-9999" :precision="0" style="width:100%"
                                    v-decorator="[
                                    'sort',
                                    {
                                        initialValue: 1,
                                        rules: [{
                                        required: true, message: '排序',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="权限集" >
                                <a-tree-select treeCheckable :treeData="treeData" searchPlaceholder="请选择权限集"
                                    v-decorator="[
                                    'permissions',
                                    {
                                        rules: [{
                                        required: true, message: '请选择权限集',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
            </div>
            </a-form>
            <template slot="footer">
                <a-button key="back" @click="cancel" html-type="submit">返回</a-button>
                <a-button key="submit" @click="handleSubmit" type="primary" >添加</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
import commonMixins from '@/mixins/common'
const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-0',
    key: '0-0-0',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
  children: [{
    title: 'Child Node3',
    value: '0-1-0',
    key: '0-1-0',
    disabled: true,
  }, {
    title: 'Child Node4',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    title: 'Child Node5',
    value: '0-1-2',
    key: '0-1-2',
  }],
}]
export default {
    mixins:[commonMixins],
    props:{
        type:{
            type:String,
            default:'add'
        },
        id:{
            type:String,
            default:null
        }
    },
    data(){
        return {
            v:true,
            treeData:treeData,
            form:this.$form.createForm(this),
            formItemLayout: {
                labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                },
                wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
                },
            },
        }
    },
    methods:{
        cancel(reload=false){
            if(reload!==true){
                reload = false
            }
            this.$emit('cancel', reload)
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
                console.log(values)
            });
        }
    }
}
</script>