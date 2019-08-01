<template>
    <div>
        <a-modal v-model="v" :title="`${type=='add' ? '添加':'编辑'}部门`" :maskClosable="false" :keyboard="false"
            :closable="false" width="70%">
            <a-form :form="form" @submit="handleSubmit">
            <div>
                    <a-row :gutter="10">
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="部门名称" >
                                <a-input
                                    v-decorator="[
                                    'name',
                                    {
                                        rules: [{
                                        required: true, message: '部门名称不能为空！',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="部门全称" >
                                <a-input
                                    v-decorator="[
                                    'all',
                                    {
                                        rules: [{
                                        required: true, message: '部门全称不能为空',
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
                            <a-form-item v-bind="formItemLayout" label="上级部门" >
                                <a-tree-select :treeData="treeData" searchPlaceholder="请选择上级部门"
                                    v-decorator="[
                                    'superior',
                                    {
                                        rules: [{
                                        required: true, message: '请选择上级部门',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="备注" >
                                <a-textarea placeholder="可输入300字的部门备注" :rows="4"
                                    v-decorator="['note']"
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