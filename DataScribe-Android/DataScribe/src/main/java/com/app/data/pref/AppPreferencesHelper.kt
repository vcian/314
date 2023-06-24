package com.app.data.pref

import android.content.Context
import android.content.Context.MODE_PRIVATE
import androidx.core.app.NotificationManagerCompat
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys
import com.app.common.theme.ThemeType
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
open class AppPreferencesHelper @Inject constructor(@ApplicationContext private val context: Context) :
    PreferencesHelper {

    companion object {
        const val PREFS_FILE = "prefs_file_app"
        const val PREFS_FILE_PUBLIC = "prefs_file_public_app"
        const val pref_key_theme = "pref_theme"
    }

    @Singleton
    fun storePrivateData(key: String, value: String) {
        val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
        val sharedPreferences = EncryptedSharedPreferences.create(
            PREFS_FILE,
            masterKeyAlias,
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
        val editor = sharedPreferences.edit()
        editor.putString(key, value)
        editor.apply()
    }

    @Singleton
    fun removePrivateValue(key: String) {
        val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
        val sharedPreferences = EncryptedSharedPreferences.create(
            PREFS_FILE,
            masterKeyAlias,
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

        val editor = sharedPreferences.edit()
        editor.remove(key)
        editor.apply()
    }

    @Singleton
    fun retrievePrivateData(key: String): String {
        val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
        val sharedPreferences = EncryptedSharedPreferences.create(
            PREFS_FILE,
            masterKeyAlias,
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )

        return sharedPreferences.getString(key, "").toString()
    }

    open fun storePublicData(key: String, value: String) {
        val editor = context.getSharedPreferences(PREFS_FILE_PUBLIC, MODE_PRIVATE).edit()
        editor.putString(key, value)
        editor.apply()
    }

    open fun retrievePublicData(key: String?): String {
        val prefs = context.getSharedPreferences(PREFS_FILE_PUBLIC, MODE_PRIVATE)
        return prefs.getString(key, "")!!
    }

    open fun removePublicValue(key: String) {
        try {
            val editor =
                context.getSharedPreferences(PREFS_FILE_PUBLIC, MODE_PRIVATE).edit()
            editor.remove(key)
            editor.apply()
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
        }
    }

    open fun clearPublicData() {
        val editor = context.getSharedPreferences(PREFS_FILE_PUBLIC, MODE_PRIVATE).edit()
        editor.clear()
        editor.apply()
    }

    @Singleton
    fun clearAlData() {
        try {
            NotificationManagerCompat.from(context).cancelAll()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        val preference = context.getSharedPreferences(
            PREFS_FILE,
            Context.MODE_PRIVATE
        ).edit()
        preference.clear()
        preference.apply()
    }

    override fun provideToken(): String {
        return "token"
    }


    @Singleton
    fun storeSelectedAppTheme(themeType: String) {
        storePrivateData(pref_key_theme, themeType)
    }

    @Singleton
    fun provideSelectedAppTheme(): String {
        val themeType: String = retrievePrivateData(pref_key_theme)
        return themeType.ifEmpty { ThemeType.light }
    }

}