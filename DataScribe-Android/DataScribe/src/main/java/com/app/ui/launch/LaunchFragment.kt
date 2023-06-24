/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.ui.launch

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import androidx.navigation.fragment.findNavController
import com.app.common.R
import com.app.common.databinding.FragmentLaunchBinding
import com.app.ui.base.BaseFragment
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class LaunchFragment : BaseFragment<FragmentLaunchBinding>(FragmentLaunchBinding::inflate) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        requireActivity().window.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
        init()
    }

    private fun init() {
        proceed()
    }

    private fun proceed() {
        if (!requireActivity().isFinishing) {
            val handler = Handler(Looper.getMainLooper())
            val runnable = Runnable {
                try {
                    requireActivity().window.clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
                    findNavController().navigate(R.id.action_launchFragment_to_homeFragment)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
            handler.postDelayed(runnable, 1500)
        }
    }
}
