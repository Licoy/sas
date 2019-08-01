<template>
    <div>
        <a-modal v-model="v" :title="`${type=='add' ? '添加':'编辑'}用户`" :maskClosable="false" :keyboard="false"
            :closable="false" width="70%">
            <a-form :form="form" @submit="handleSubmit">
            <div>
                    <a-row :gutter="10">
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="账号" >
                                <a-input
                                    v-decorator="[
                                    'account',
                                    {
                                        rules: [{
                                        required: true, message: '账号不能为空！',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="姓名" >
                                <a-input
                                    v-decorator="[
                                    'name',
                                    {
                                        rules: [{
                                        required: true, message: '姓名不能为空',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="密码" >
                                <a-input type='password'
                                    v-decorator="[
                                    'password',
                                    {
                                        rules: [{
                                        required: true, message: '请输入6-18位英文数字组成的密码',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="E-mail" >
                                <a-input
                                    v-decorator="[
                                    'email',
                                    {
                                        rules: [{
                                        type: 'email', message: '邮箱合适不正确！',
                                        }, {
                                        required: true, message: '请填写邮箱号码！',
                                        }]
                                    }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="性别" >
                                <a-radio-group buttonStyle="solid" v-decorator="[
                                    'gender',
                                    {
                                        initialValue: 1,
                                        rules: [{
                                        required: true, message: '请选择性别',
                                        }]
                                    }
                                    ]">
                                    <a-radio-button :value="1">男</a-radio-button>
                                    <a-radio-button :value="2">女</a-radio-button>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="电话号码" >
                                <a-input v-decorator="[
                                    'phone',
                                    {
                                        rules: []
                                    }
                                    ]">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="部门" >
                                <a-select style="width: 100%" placeholder="请选择部门" v-decorator="[
                                    'dept',
                                    {
                                        rules: [{
                                        required: true, message: '请选择部门',
                                        }]
                                    }
                                    ]">
                                    <a-select-option v-for="i in 10" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="职位" >
                                <a-select style="width: 100%" placeholder="请选择职位" v-decorator="[
                                    'position',
                                    {
                                        rules: [{
                                        required: true, message: '请选择职位',
                                        }]
                                    }
                                    ]">
                                    <a-select-option v-for="i in 10" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span='12'>
                            <a-form-item v-bind="formItemLayout" label="角色" >
                                <a-select style="width: 100%" placeholder="请选择角色" v-decorator="[
                                    'role',
                                    {
                                        rules: [{
                                        required: true, message: '请选择角色',
                                        }]
                                    }
                                    ]">
                                    <a-select-option v-for="i in 10" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
                                </a-select>
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