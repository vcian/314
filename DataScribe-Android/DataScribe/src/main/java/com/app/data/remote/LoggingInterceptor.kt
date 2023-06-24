/*
 * Copyright (c) 2023.6.9
 * All right reserved edeXa 2023
 *  Created by Haresh Vaghela
 */

package com.app.data.remote

import com.app.common.AppLogger
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import okio.Buffer
import java.io.IOException

class LoggingInterceptor : Interceptor {
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val requestBody = bodyToString(request)
        val url = request.url.toString()

        logRequest(url, requestBody)

        val response = chain.proceed(request)

        val responseBody = response.body?.string() ?: ""
        logResponse(url, responseBody)

        return response.newBuilder()
            .body(responseBody.toResponseBody(response.body?.contentType()))
            .build()
    }

    private fun bodyToString(request: Request): String {
        val buffer = Buffer()
        request.body?.writeTo(buffer)
        return buffer.readUtf8()
    }

    private fun logRequest(url: String, requestBody: String) {
        val logMessage = StringBuilder()
            .append("Request URL: $url")
            .append("\nRequest Body: $requestBody")
            .toString()

        // Modify as needed to print the log message
        // For example, you can use Timber, Log, or a custom logger
        AppLogger.d("okhttp",logMessage)
    }

    private fun logResponse(url: String, responseBody: String) {
        val logMessage = StringBuilder()
            .append("Response URL: $url")
            .append("\nResponse Body: $responseBody")
            .toString()

        // Modify as needed to print the log message
        // For example, you can use Timber, Log, or a custom logger
        AppLogger.d("okhttp",logMessage)
    }
}
