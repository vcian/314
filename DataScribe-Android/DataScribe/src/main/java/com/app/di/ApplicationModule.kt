package com.app.di

import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

@Module
@InstallIn(SingletonComponent::class)
class ApplicationModule {

    /*@Singleton
    @Provides
    fun provideLabels(@ApplicationContext appContext: Context): En {
        return Label().En(context = appContext)
    }*/
}