<template>
    <div class="auth">
        <div class="auth__inner">
            <div class="auth__col">
                <div class="auth__logo">
                    <img class="_view1" src="../../assets/img/logo.svg" alt="">
                    <img class="_view2" src="../../assets/img/logo2.svg" alt="">
                </div>

                <slot/>

                <div class="auth-alternative">
                    <div class="auth-alternative__title">
                        Or, login with
                    </div>
                    <div class="auth-alternative__links">
                        <a href="" class="auth-alternative__link">Facebook</a>
                        <a href="" class="auth-alternative__link">Linked In</a>
                        <a href="" class="auth-alternative__link">Google</a>
                    </div>
                </div>
            </div>
            <div class="auth__col2">
                <img src="../../assets/img/auth.svg" alt="" class="auth__img">
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .auth{
        padding: 1em;
        min-height: 100vh;
        @include center;
        color: $darkGreen;
        background-color: $darkGreen;
        &__inner{
            display: grid;
            grid-template-columns: 34.375em calc(100% - 34.375em);
            border-radius: 1.5em;
            background: $white;
            box-shadow: 0px 72px 80px -48px #223A28;
            width: 81em;
            max-width: 100%;
        }
        &__col{
            padding: 2.5em 4em 4.125em;
        }
        &__col2{
            @include center;
            padding: 5em;
            background: #F5DBC4;
            border-radius: 0 1.5em 1.5em 0;
        }
        &__logo{
            width: 13.5em;
            img{
                width: 100%;
                display: block;
            }
            ._view2{
                display: none;
            }
        }
        &__img{
            width: 31.25em;
            display: block;
            margin: 0 auto;
        }
        & :deep(.auth-form) {
            .auth-form{
                &__text{
                    margin-top: 3.5em;
                    @include grid100gap(1em);
                }
                &__fields{
                    margin-top: 2em;
                    @include grid100gap(1.5em);
                }
                &__nav{
                    margin-top: 1.5em;
                    display: grid;
                    grid-template-columns: repeat(2,calc(50% - .75em));
                    gap: 1.5em;
                }
                &__wrap{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 1.5em;
                }
                &__error{
                    margin-top: 1em;
                    color: red;
                }
            }
        }
    }

    .auth-alternative{
        margin-top: 3.5em;
        display: flex;
        &__title{
            color: #58745E;
        }
        &__links{
            display: flex;
        }
        &__link{
            margin-left: 1.5em;
            font-weight: 500;
        }
    }

    @media screen and (max-width: 992px) {
        .auth{
            padding: 7em 0 0;
            flex-direction: column;
            justify-content: unset;
            position: relative;
            &__inner{
                width: 100%;
                border-radius: 0;
                display: flex;
                flex-direction: column;
            }
            &__col{
                padding: 2em 1.5em 2.625em;
            }
            &__col2{
                order: -1;
                padding: 1em;
                height: 13.75em;
                border-radius: 0;
            }
            &__img{
                width: 14.375em;
            }
            &__logo{
                position: absolute;
                top: 2em;
                left: 50%;
                transform: translateX(-50%);
                ._view1{
                    display: none;
                }
                ._view2{
                    display: block;
                }
            }
            & :deep(.auth-form) {
                .auth-form{
                    &__text{
                        margin-top: 0;
                    }
                    &__fields{
                        margin-top: 2.5em;
                    }
                }
            }
        }

        .auth-alternative{
            margin-top: 2.5em;
            flex-direction: column;
            align-items: center;
            &__title{
                font-size: .875em;
            }
            &__links{
                width: 100%;
                margin-top: 1.5em;
                gap: 1em;
            }
            &__link{
                font-size: .875em;
                margin: 0;
                flex-grow: 1;
                @include center;
            }
        }
    }
</style>
