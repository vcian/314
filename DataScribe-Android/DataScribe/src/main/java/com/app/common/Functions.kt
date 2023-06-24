package com.app.common

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.webkit.MimeTypeMap
import androidx.activity.ComponentActivity
import androidx.fragment.app.Fragment
import androidx.viewbinding.ViewBinding
import com.app.data.remote.api.Params
import org.json.JSONException
import org.json.JSONObject
import java.text.DecimalFormat
import java.util.regex.Matcher
import java.util.regex.Pattern

inline fun <T : ViewBinding> ComponentActivity.viewBinding(crossinline bindingInflater: (LayoutInflater) -> T) =
    lazy(
        LazyThreadSafetyMode.NONE
    ) {
        bindingInflater.invoke(layoutInflater)
    }

fun isFileLarge(fileSize: Long): Boolean {
    val maxLimit: Long = 5
    val limit_bytes = maxLimit * 1000000
    return fileSize > limit_bytes
}


fun isEmailValid(email: String): Boolean {
    val expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,10}$"
    val pattern: Pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE)
    val matcher: Matcher = pattern.matcher(email)
    return matcher.matches()
}

inline fun <reified T : Any> Activity.launchActivity(
    requestCode: Int = -1,
    noinline init: Intent.() -> Unit = {}
) {
    val intent = newIntent<T>(this)
    intent.init()
    if (requestCode == -1)
        startActivity(intent)
    else
        startActivityForResult(intent, requestCode)
}

inline fun <reified T : Any> newIntent(context: Context): Intent =
    Intent(context, T::class.java)

fun Context.hideKeyboard(view: View) {
    val inputMethodManager = getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    inputMethodManager.hideSoftInputFromWindow(view.windowToken, 0)
}

//Hide Keyboards method
fun Fragment.hideKeyboard() {
    view?.let { activity?.hideKeyboard(it) }
}

fun Activity.hideKeyboard() {
    hideKeyboard(currentFocus ?: View(this))
}

fun View.visible(isVisible: Boolean) {
    visibility = if (isVisible) View.VISIBLE else View.GONE
}

fun prettyCount(number: Number): String? {
    val suffix = charArrayOf(' ', 'k', 'M', 'B', 'T', 'P', 'E')
    val numValue = number.toLong()
    val value = Math.floor(Math.log10(numValue.toDouble())).toInt()
    val base = value / 3
    return if (value >= 3 && base < suffix.size) {
        DecimalFormat("#0.0").format(
            numValue / Math.pow(
                10.0,
                (base * 3).toDouble()
            )
        ) + suffix[base]
    } else {
        DecimalFormat("#,##0").format(numValue)
    }
}

fun getErrorMessage(errorBody: String): String {
    /*val errorObj = JSONObject(errorBody)*/
    var message = "Something went wrong"
    if (errorBody.isNotEmpty()) {
        try {
            message = JSONObject(errorBody).getString(Params.message)
        } catch (e: JSONException) {
        }
    }
    return message
}

fun getErrorStatus(errorBody: String): Int {
    /*val errorObj = JSONObject(errorBody)*/
    var status = 0
    if (errorBody.isNotEmpty()) {
        try {
            status = JSONObject(errorBody).getInt(Params.status)
        } catch (e: JSONException) {
        }
    }
    return status
}

fun dp2px(context: Context, dp: Int): Int {
    val r = context.resources
    return TypedValue.applyDimension(
        TypedValue.COMPLEX_UNIT_DIP,
        dp.toFloat(),
        r.displayMetrics
    ).toInt()
}

fun getMimeType(uri: String): String? {
    var type: String? = null //  ww  w  . jav a  2s. co m
    val extension = MimeTypeMap.getFileExtensionFromUrl(uri)
    if (extension != null) {
        val mime = MimeTypeMap.getSingleton()
        type = mime.getMimeTypeFromExtension(extension)
    }
    return type ?: "image/JPG"
}

fun verifyInstallerId(context: Context): Boolean {
    // A list with valid installers package name
    // com.google.android.feedback in Google Analytics to count of CRASHES & ANRS in Google Paly Developer Console and found these to be equal.
    // com.abdriud.vending refer to the google play store vender
    /*val validInstallers: List<String> =
        java.util.ArrayList(Arrays.asList("com.android.vending", "com.google.android.feedback"))

    // The package name of the app that has installed your app
    // Terminall and manually install will return null here
    val installer = context.packageManager.getInstallerPackageName(context.packageName)

    // true if your app has been downloaded from Play Store
    return installer != null && validInstallers.contains(installer)*/
    return true;
}