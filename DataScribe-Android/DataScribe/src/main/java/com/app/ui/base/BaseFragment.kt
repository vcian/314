/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.ui.base

import android.app.ProgressDialog
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.NavOptions
import androidx.viewbinding.ViewBinding
import com.app.common.R
import com.app.common.getErrorMessage
import com.app.common.getErrorStatus
import com.app.data.pref.AppPreferencesHelper
import com.app.data.remote.NetworkHelper
import com.app.ui.MainActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import javax.inject.Inject

open class BaseFragment<T : ViewBinding>(private val bindingInflater: (LayoutInflater) -> T) :
    Fragment(), View.OnClickListener {


    @Inject
    lateinit var preferencesHelper: AppPreferencesHelper

    @Inject
    lateinit var networkHelper: NetworkHelper

    private var _binding: T? = null
    val binding: T
        get() = _binding
            ?: throw RuntimeException("Should only use binding after onCreateView and before onDestroyView")

    var isLaunchScreen: Boolean = false

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = bindingInflater.invoke(inflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onClick(view: View?) {
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }

    open fun getActContext(): Context {
        return requireActivity()
    }

    fun showMessage(title: String, message: String, callback: () -> Unit) {
        MaterialAlertDialogBuilder(getActContext(), R.style.RoundedShapeDialog).setTitle(title)
            .setMessage(message).setCancelable(false).setNegativeButton(
                getActContext().resources.getString(R.string.okay)
            ) { dialog, _ ->
                dialog.dismiss()
                callback()
            }.show()
    }

    fun reLaunch() {
        val activity = activity
        if (activity != null && !activity.isFinishing) {
            val intent = Intent(activity, MainActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
        }
    }

    val navOptions = NavOptions.Builder()
        .setEnterAnim(R.anim.slide_in_right)
        .setExitAnim(R.anim.slide_out_left)
        .setPopEnterAnim(R.anim.slide_in_left)
        .setPopExitAnim(R.anim.slide_out_right)
        .build()

    private var isDialogOpen = false
    private var isDialogOpenSecond = false

    fun showNoInternet(
        positiveButton: () -> Unit,
        negativeButton: () -> Unit
    ) {
        if (isDialogOpen) {
            return
        }
        isDialogOpen = true
        MaterialAlertDialogBuilder(getActContext(), R.style.RoundedShapeDialog)
            .setTitle(resources.getString(R.string.no_internet))
            .setMessage(resources.getString(R.string.connection_error))
            .setCancelable(false)
            .setPositiveButton(
                resources.getString(R.string.retry)
            ) { dialog, _ ->
                isDialogOpen = false
                dialog!!.dismiss()
                positiveButton()
            }
            .setNegativeButton(
                resources.getString(R.string.close)
            ) { dialog, _ ->
                isDialogOpen = false
                dialog!!.dismiss()
                negativeButton()
            }
            .show()
    }

    fun showNoInternet() {
        if (isDialogOpenSecond) {
            return
        }
        isDialogOpenSecond = true
        MaterialAlertDialogBuilder(getActContext(), R.style.RoundedShapeDialog)
            .setTitle(resources.getString(R.string.no_internet))
            .setMessage(resources.getString(R.string.connection_error))
            .setCancelable(false)
            .setPositiveButton(
                resources.getString(R.string.okay)
            ) { dialog, _ ->
                isDialogOpenSecond = false
                dialog!!.dismiss()
            }.show()
    }

}