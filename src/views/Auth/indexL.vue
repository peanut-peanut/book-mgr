<template>
    <div class="auth">
        <div class="bg"></div>
        <div class="title-info">
            <img src="https://bpic.51yuansu.com/pic3/cover/03/10/70/5b48631d531c3_610.jpg
            " alt="">
            <h2 class="title">图书交易平台</h2>
        </div>
        <div class="form">
            <a-tabs>
                <a-tab-pane key="1" tab="登录">
                    <div class="item">
                        <a-input size="large" placeholder="账户">
                            <template #prefix>
                                <UserOutlined />
                              </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large" placeholder="密码">
                            <template #prefix>
                                <LockOutlined />
                              </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a href="">忘记密码</a>
                    </div>
                    <div class="item">
                        <a-button size="large" type="primary">
                            登录
                        </a-button>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="注册">
                    <div class="item">
                        <a-input size="large" placeholder="账户">
                            <template #prefix>
                                <UserOutlined />
                              </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large" placeholder="密码">
                            <template #prefix>
                                <LockOutlined />
                              </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-input size="large" placeholder="邀请码">
                            <template #prefix>
                                <MailOutlined />
                              </template>
                        </a-input>
                    </div>
                    <div class="item">
                        <a-button size="large" type="primary">
                            注册
                        </a-button>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script src="./indexL.js"></script>

<style lang="scss" scoped>
@import './indexL.scss'
</style>