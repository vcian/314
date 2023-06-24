/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.ui

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.app.common.R
import com.app.common.databinding.ActivityMainBinding
import com.app.common.theme.AppThemePreference
import com.app.common.theme.ThemeType
import com.app.ui.base.BaseActivity
import com.google.android.material.elevation.SurfaceColors
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : BaseActivity<ActivityMainBinding>(ActivityMainBinding::inflate) {

    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            window.navigationBarColor = SurfaceColors.SURFACE_2.getColor(this)
        }
        //window.navigationBarColor = getColor(R.color.colorPrimary)
        //window.statusBarColor = getColor(R.color.colorPrimary)
        setContentView(binding.root)
        setSelectedTheme()

        setupNavigation()

        startBubbleService()
    }

    private fun setSelectedTheme() {
        when (preferencesHelper.provideSelectedAppTheme()) {
            ThemeType.system_default -> {
                AppThemePreference.setSystemDefaultTheme()
            }
            ThemeType.dark -> {
                AppThemePreference.setDarkTheme()
            }
            ThemeType.light -> {
                AppThemePreference.setLightTheme()
            }
        }
    }

    private fun setupNavigation() {
        navController = findNavController(R.id.fragNavHost)
        binding.mBottomNavigationView.setupWithNavController(navController = navController)

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.launchFragment -> {
                    hideBottomNav()
                }
                else -> {
                    showBottomNav()
                }
            }
        }
    }

    private fun showBottomNav() {
        binding.mBottomNavigationView.visibility = View.VISIBLE
        //animateView(getActContext(),binding.mBottomNavigationView, com.airbnb.lottie.R.anim.abc_grow_fade_in_from_bottom)
    }

    private fun hideBottomNav() {
        binding.mBottomNavigationView.visibility = View.GONE
    }


    private fun startBubbleService() {
        //val bubbleIntent = Intent(this, BubbleService::class.java)
        //startService(bubbleIntent)
    }
}