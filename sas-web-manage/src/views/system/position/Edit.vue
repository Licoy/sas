<template>
    <div>
        <a-modal v-model="v" :title="`${type=='add' ? '添加':'编辑'}职位`" :maskClosable="false" :keyboard="false"
            :closable="false" width="70%">
            <a-form :form="form" @submit="handleSubmit">
            <div>
                    <a-row :gutter="10">
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="职位名称" >
                                <a-input
                                    v-decorator="[
                                    'name',
                                    {
                                        rules: [{
                                        required: true, message: '职位名称不能为空！',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="职位编码" >
                                <a-input
                                    v-decorator="[
                                    'alias',
                                    {
                                        rules: [{
                                        required: true, message: '职位编码不能为空',
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
                            <a-form-item v-bind="formItemLayout" label="状态" >
                                <a-switch v-decorator="[
                                    'status',
                                    {
                                        initialValue: false,
                                        rules: [{
                                        required: true, message: '请选择状态',
                                        }]
                                    }
                                    ]">
                                </a-switch>
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