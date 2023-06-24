/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.common

import android.util.Log

class AppLogger {
    companion object{
        fun d(s: String) {
            if (BuildConfig.DEBUG) {
                Log.d("App_LOG", "{\n $s \n}")
            }
        }

        fun d(TAG: String,s: String) {
            if (BuildConfig.DEBUG) {
                Log.d(TAG, "{\n $s \n}")
            }
        }
    }
}