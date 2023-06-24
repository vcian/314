/*
 * Copyright (c) 2023.6.24
 * All right reserved edeXa 2023
 * Created by Haresh Vaghela
 */

package com.app.di

import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ActivityComponent

@Module
@InstallIn(ActivityComponent::class)
class ActivityModule {

   /* @Provides
    @ActivityScoped
    fun provideAdapterFragmentState(@ActivityContext context: Context): MembersAdapter {
        return MembersAdapter(context,null,null,null)
    }*/

}