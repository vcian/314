/*
 * Copyright (c) 2022.10.14
 * All right reserved edeXa AG 2022
 * Created by Haresh Vaghela
 */

package com.app.common

import android.Manifest
import android.os.Build

object Constants {

    const val minPinCodeLimit = 4
    const val maxPinCodeLimit = 8

    const val minPhoneLimit = 8
    const val maxPhoneLimit = 15

    const val general_error_message = "Something Went Wrong."
    const val directory_create_error = "Failed to save QRCode."
    const val error_network = "No internet connection."
    const val PREFS_FILE = "prefs_file_bTrack"
    const val dialog_background_color = "#887391B8"
    const val labels_file_name = "labels.json"
    const val default_app_folder_path = "labels.json"

    const val FCM_TOKEN = "FCM_TOKEN"
    const val pref_user_info_json_data = "user_info_json_data"
    const val pref_label_json_data = "pref_label_json_data"
    const val pref_language = "pref_language"
    const val pref_theme = "pref_theme"
    const val intent_group_id = "intent_group_id"
    const val intent_report_id = "intent_report_id"
    const val intent_group_short_code = "intent_group_short_code"
    const val pref_group_member_limit = "pref_group_member_limit"
    const val pref_activity_link = "pref_activity_link"
    const val pref_invitation_link = "pref_invitation_link"
    const val pref_hash_validation_link = "pref_hash_validation_link"
    const val pref_lock_tag = "pref_lock_tag"

    const val default_page = 1
    const val default_data_load_limit = 10
    const val default_file_upload_size = "5 MB!"

    const val PATTERN_YYY_MM_DD_HH_MM_SS_TEMP = "yyyy-MM-dd-HH-mm-ss"
    const val PATTERN_DD_MM_YYYY_HH_MM = "dd/MM/yyyy hh:mm aa"
    const val PATTERN_DD_MMM_YYYY = "dd MMM yyyy"
    const val PATTERN_DAY_MMM_DATE_YYYY = "E, MMM d, yyyy"
    const val PATTERN_PROFILE_DD_MM_YYYY = "dd MMMM yyyy"
    const val PATTERN_DD_MMM_YYYY_HH_MM_AA = "dd MMM yyyy, hh:MM aa"

    const val MY_CAMERA_STORAGE_PERMISSION_CODE = 102

    const val freshUser = "freshUser"
    const val notificationId = "notificationId"

    const val isSelectingAddress = "isSelectingAddress"
    const val isCreatingGroup = "isCreatingGroup"
    const val isUpdatingGroup = "isUpdatingGroup"
    const val isFromGroupDetails = "isGroupDetails"

    const val selectedAddressId = "selectedAddressId"
    const val just_selecting_address = "just_selecting_address"
    const val selected_address_object = "selected_address_object"

    const val create_group_select_member = "create_group_select_member"
    const val selected_members_object = "selected_members_object"

    const val members_update_address = "members_update_address"
    const val group_details_add_members = "group_details_add_members"

    const val group_details_object = "group_details_object"

    const val group_is_process_started = "group_is_process_started"
    const val group_reload_additional_info = "group_reload_additional_info"

    const val report_select_group = "report_select_group"
    const val report_select_group_obj = "report_select_group_obj"

    const val activity_hash = "activity_hash"

    const val group_id = "group_id"
    const val tagWriteRequest = "tagWriteRequest"
    const val short_code = "short_code"
    const val scanType = "scanType"
    const val enable_haptic_touch = true

    const val qrcode_raw_value = "qrcode_raw_value"

    const val req_code_nfc = 1000

    val mimeTypes = arrayOf(
        "image/JPEG",
        "image/BMP",
        "image/PNG",
        "image/JPG",
        "image/jpeg",
        "image/bmp",
        "image/png",
        "image/WebP",
        "image/jpg",
    )

    val STORAGE_CAMERA_PERMISSIONS: Array<String?> =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            arrayOf(
                Manifest.permission.CAMERA,
                Manifest.permission.READ_MEDIA_IMAGES,
                /*Manifest.permission.READ_MEDIA_VIDEO,*/
                /*Manifest.permission.READ_MEDIA_AUDIO*/
            )
        } else {
            arrayOf(
                Manifest.permission.CAMERA,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
        }

    val STORAGE_PERMISSIONS: Array<String?> =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            arrayOf(
                Manifest.permission.READ_MEDIA_IMAGES,
                /*Manifest.permission.READ_MEDIA_VIDEO,*/
                /*Manifest.permission.READ_MEDIA_AUDIO*/
            )
        } else {
            arrayOf(
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
            )
        }
}