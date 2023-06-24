/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.data.remote

import com.app.data.pref.AppPreferencesHelper
import javax.inject.Inject

class TokenManager @Inject constructor(
    /*@ApplicationContext context: Context,*/
    private val preferencesHelper: AppPreferencesHelper
) {
    fun getToken(): String {
        val token = preferencesHelper.provideToken()
        return "Bearer ".plus(token)
    }

    /* fun saveToken(token: String) {
         //preferencesHelper.storeAuthData()
     }*/
}