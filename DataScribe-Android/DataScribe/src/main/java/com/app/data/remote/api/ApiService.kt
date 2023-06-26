/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */


package com.app.data.remote.api

import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST(ApiRoute.post_signup)
    suspend fun signup(
        @Body() params: HashMap<String, Any>,
    ): Response<ResponseBody>


}