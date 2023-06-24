/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.common.theme

import android.content.Context
import android.content.DialogInterface
import android.content.res.Configuration
import android.os.Build
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatDelegate
import com.app.common.R

class AppThemePreference {

    fun performThemeSelection(context: Context, onThemeChange: (themeType: String) -> Unit) {
        var selectedThemePosition = 0
        val nightModeFlags =
            context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK

        when (nightModeFlags) {
            Configuration.UI_MODE_NIGHT_UNDEFINED -> {
                selectedThemePosition = 0
            }
            Configuration.UI_MODE_NIGHT_YES -> {
                selectedThemePosition = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) 1 else 0
            }
            Configuration.UI_MODE_NIGHT_NO -> {
                selectedThemePosition = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) 2 else 1
            }
        }

        val alertDialog: AlertDialog

        val values: Array<String> =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) arrayOf<String>(
                " Follow System ",
                " Dark ",
                " Light "
            ) else arrayOf<String>(" Dark ", " Light ")

        val builder = AlertDialog.Builder(context, R.style.ThemeOverlay_App_MaterialAlertDialog)
        builder.setTitle("Choose theme")
        builder.setCancelable(false)
        builder.setNegativeButton(
            "Close"
        ) { dialog: DialogInterface, _: Int -> dialog.dismiss() }
        builder.setSingleChoiceItems(
            values,
            selectedThemePosition
        ) { dialog: DialogInterface, item: Int ->
            when (item) {
                0 -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        setSystemDefaultTheme()
                    } else {
                        setDarkTheme()
                    }
                    onThemeChange(if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) ThemeType.system_default else ThemeType.dark)
                }
                1 -> {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        setDarkTheme()
                    } else {
                        setLightTheme()
                    }
                    onThemeChange(if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) ThemeType.dark else ThemeType.light)
                }
                2 -> {
                    setLightTheme()
                    onThemeChange(ThemeType.light)
                }
            }
            dialog.dismiss()
        }
        alertDialog = builder.create()
        alertDialog.show()
    }

    companion object {
        fun setSystemDefaultTheme() {
            //Follow System
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
        }

        fun setDarkTheme() {
            //enable dark theme:
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
        }

        fun setLightTheme() {
            //forcefully disable dark theme:
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        }
    }

}