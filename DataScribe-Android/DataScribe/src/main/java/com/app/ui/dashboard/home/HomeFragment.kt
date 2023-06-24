/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.ui.dashboard.home

import android.os.Bundle
import android.view.View
import com.app.common.databinding.FragmentHomeBinding
import com.app.common.theme.AppThemePreference
import com.app.ui.base.BaseFragment
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class HomeFragment : BaseFragment<FragmentHomeBinding>(FragmentHomeBinding::inflate) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.secondaryButton.setOnClickListener { select() }
    }

    private fun select() {
        AppThemePreference().performThemeSelection(getActContext(), ::onThemeChange)
    }

    private fun onThemeChange(themeType: String) {
        preferencesHelper.storeSelectedAppTheme(themeType)
    }

}