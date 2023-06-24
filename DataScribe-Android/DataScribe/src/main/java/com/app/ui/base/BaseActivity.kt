package com.app.ui.base

import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.view.LayoutInflater
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import com.app.common.R
import com.app.data.pref.AppPreferencesHelper
import com.app.data.remote.NetworkHelper
import com.app.ui.MainActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.snackbar.BaseTransientBottomBar
import com.google.android.material.snackbar.Snackbar
import javax.inject.Inject
import androidx.viewbinding.ViewBinding
import com.app.common.viewBinding

open class BaseActivity<T : ViewBinding>(bindingInflater: (LayoutInflater) -> T) :
    AppCompatActivity(), View.OnClickListener {

    @Inject
    lateinit var preferencesHelper: AppPreferencesHelper

    @Inject
    lateinit var networkHelper: NetworkHelper

    val binding: T by viewBinding(bindingInflater)

    override fun onClick(view: View?) {
    }

    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)
        supportActionBar?.hide()
    }

    open fun getActContext(): Context {
        return this@BaseActivity
    }

    fun showMessage(title: String, message: String) {
        MaterialAlertDialogBuilder(this@BaseActivity, R.style.RoundedShapeDialog).setTitle(title)
            .setMessage(message).setCancelable(false).setNegativeButton(
                getString(R.string.okay)
            ) { dialog, _ ->
                dialog.dismiss()
            }.show()
    }

    fun showMessage(
        title: String,
        message: String,
        positiveText: String,
        negativeText: String,
        isCancelable: Boolean,
        onPositiveClick: (DialogInterface) -> Unit,
        onNegativeClick: (DialogInterface) -> Unit
    ) {
        MaterialAlertDialogBuilder(this@BaseActivity, R.style.RoundedShapeDialog)
            .setTitle(title)
            .setMessage(message)
            .setCancelable(isCancelable)
            .setPositiveButton(
                positiveText
            ) { dialog, _ ->
                onPositiveClick(dialog)
            }
            .setNegativeButton(negativeText) { dialog, _ ->
                onNegativeClick(dialog)
            }.show()
    }

    fun showMessageAndRestart(title: String, message: String) {
        MaterialAlertDialogBuilder(this@BaseActivity, R.style.RoundedShapeDialog).setTitle(title)
            .setMessage(message).setCancelable(false).setNegativeButton(
                getString(R.string.okay)
            ) { dialog, _ ->
                dialog.dismiss()
                reLaunch()
            }.show()
    }

    fun reLaunch() {
        val intent = Intent(this@BaseActivity, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }

    fun setDarkTheme() {
        //enable dark theme:
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
    }

    fun setLightTheme() {
        //forcefully disable dark theme:
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
    }

    fun setSystemDefaultTheme() {
        //Follow System
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
    }

    fun showSnackBar(context: Context, view: View, message: String) {
        val snackbar = Snackbar.make(
            view,
            message,
            6000
        )
        snackbar.animationMode = BaseTransientBottomBar.ANIMATION_MODE_SLIDE
        snackbar.setAction("dismiss") {
            snackbar.dismiss()
        }
        snackbar.show()
    }

    fun showSnackBar(context: Context, view: View, message: String, anchorView: View) {
        val snackbar = Snackbar.make(
            view,
            message,
            5000
        )
        snackbar.anchorView = anchorView
        snackbar.animationMode = BaseTransientBottomBar.ANIMATION_MODE_SLIDE
        snackbar.setAction("dismiss") {
            snackbar.dismiss()
        }
        snackbar.show()
    }

    fun showBaseNoInternet() {
        MaterialAlertDialogBuilder(getActContext(), R.style.RoundedShapeDialog)
            .setTitle(resources.getString(R.string.went_wrong_text))
            .setMessage(resources.getString(R.string.connection_error))
            /*.setPositiveButton(resources.getString(R.string.retry)
            ) { dialog, _ ->
                dialog!!.dismiss()
            }*/
            .setNegativeButton(
                resources.getString(R.string.close)
            ) { _: DialogInterface, _: Int ->

            }
            .show()
    }
}