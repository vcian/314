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