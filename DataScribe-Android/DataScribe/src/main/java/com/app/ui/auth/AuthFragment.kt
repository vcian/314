/*
 * Copyright (c) 2023.6.25
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.ui.auth

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.app.common.R
import com.app.common.databinding.FragmentAuthBinding
import com.app.ui.base.BaseFragment


class AuthFragment : BaseFragment<FragmentAuthBinding>(FragmentAuthBinding::inflate) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        init()
    }

    private fun init() {

    }
}