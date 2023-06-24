package com.app.di

import com.app.common.BuildConfig
import com.app.data.remote.AuthInterceptor
import com.app.data.remote.api.ApiService
import com.app.data.remote.api.AuthApiService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class NetworkModule {

    @Provides
    fun provideBaseUrl() = BuildConfig.APP_BASE_URL

    @Singleton
    @Provides
    fun providesRetrofit(/*okHttpClient: OkHttpClient, */BASE_URL: String): Retrofit.Builder {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            /*.client(okHttpClient)*/
            .addConverterFactory(GsonConverterFactory.create())
    }

    /*@Provides
    @Singleton
    fun provideOkHttpClient(authInterceptor: AuthInterceptor) = if (BuildConfig.DEBUG) {
        val loggingInterceptor = HttpLoggingInterceptor()
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY)
        OkHttpClient.Builder()
            .connectTimeout(2, TimeUnit.MINUTES)
            .readTimeout(2, TimeUnit.MINUTES)
            .writeTimeout(2, TimeUnit.MINUTES)
            .addInterceptor(loggingInterceptor)
            .addInterceptor(authInterceptor)
            .retryOnConnectionFailure(true)
            .build()
    } else {
        OkHttpClient.Builder()
            .connectTimeout(2, TimeUnit.MINUTES)
            .readTimeout(2, TimeUnit.MINUTES)
            .writeTimeout(2, TimeUnit.MINUTES)
            .addInterceptor(authInterceptor)
            .retryOnConnectionFailure(true)
            .build()
    }*/

    @Provides
    @Singleton
    fun provideOkHttpClient(authInterceptor: AuthInterceptor): OkHttpClient {
        val builder = OkHttpClient.Builder()
            .connectTimeout(2, TimeUnit.MINUTES)
            .readTimeout(2, TimeUnit.MINUTES)
            .writeTimeout(2, TimeUnit.MINUTES)
            /*.addInterceptor(authInterceptor)*/
            .retryOnConnectionFailure(true)

        if (BuildConfig.DEBUG) {
            val loggingInterceptor = HttpLoggingInterceptor()
            loggingInterceptor.level = HttpLoggingInterceptor.Level.BODY
            builder.addInterceptor(loggingInterceptor)
            /*builder.addInterceptor(LoggingInterceptor())*/
        }

        return builder.build()
    }

    @Singleton
    @Provides
    fun providesApiService(
        retrofitBuilder: Retrofit.Builder,
        okHttpClient: OkHttpClient
    ): AuthApiService {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(AuthApiService::class.java)
    }

    @Singleton
    @Provides
    fun provideNonAuthorizeApiService(
        retrofitBuilder: Retrofit.Builder,
        okHttpClient: OkHttpClient
    ): ApiService {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(ApiService::class.java)
    }

}