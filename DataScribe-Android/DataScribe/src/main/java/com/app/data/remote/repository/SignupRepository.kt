/*
 * Copyright (c) 2023.6.25
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.data.remote.repository

import androidx.lifecycle.MutableLiveData
import com.app.common.AppLogger
import com.app.common.Constants
import com.app.common.getErrorMessage
import com.app.data.remote.NetworkHelper
import com.app.data.remote.NetworkResult
import com.app.data.remote.api.ApiService
import com.app.data.remote.api.Params
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ViewModelComponent
import okhttp3.ResponseBody
import javax.inject.Inject

@Module
@InstallIn(ViewModelComponent::class)
class SignupRepository @Inject constructor(
    private val apiService: ApiService,
    private val networkHelper: NetworkHelper
) {


    private val _userInfoData = MutableLiveData<NetworkResult<ResponseBody>>()
    val userInfoLiveDataModel get() = _userInfoData

    suspend fun getUserInfo(email: String, pass: String) {
        if (!networkHelper.isNetworkConnected()) {
            _userInfoData.postValue(NetworkResult.Error(Constants.error_network))
            return
        }
        try {
            _userInfoData.postValue(NetworkResult.Loading())

            val map: HashMap<String, Any> = HashMap()
            map[Params.email] = email
            map[Params.password] = pass


            val response = apiService.signup(map)

            if (response.isSuccessful && response.body() != null) {
                _userInfoData.postValue(NetworkResult.Success(response.body()!!))
            } else if (response.errorBody() != null) {
                val objString = response.errorBody()!!.charStream().readText()
                _userInfoData.postValue(NetworkResult.Error(getErrorMessage(objString)))
            } else _userInfoData.postValue(NetworkResult.Error(Constants.general_error_message))
        } catch (e: Exception) {
            _userInfoData.postValue(NetworkResult.Error(Constants.general_error_message))
            e.printStackTrace()
        }
    }
}