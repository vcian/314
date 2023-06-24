package com.app.data.remote

import com.app.data.remote.api.Params
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor @Inject constructor() : Interceptor {

    @Inject
    lateinit var tokenManager: TokenManager

    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request().newBuilder()

        val token = tokenManager.getToken()
        if (token.isNotEmpty()){
           // AppLogger.d("okhttp", "Token: $token")
            request.addHeader(Params.Authorization, token)
            //request.addHeader(Params.Authorization,"Bearer $token")
        }

        return chain.proceed(request.build())
    }
}