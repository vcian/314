/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.data.remote.api

import com.app.common.BuildConfig

object ApiRoute {

    //UnAuthorise {token} APIs
    const val get_settings = "settings"

    const val checkpoint_hash_path = BuildConfig.APP_WEBSITE_URL.plus("/validate-hash/")
    const val checkpoint_question_url = BuildConfig.APP_WEBSITE_URL.plus("/qrcode?qrcodeid=")
}