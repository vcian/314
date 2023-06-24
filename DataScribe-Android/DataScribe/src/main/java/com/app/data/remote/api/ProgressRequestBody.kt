
package com.app.data.remote.api

import okhttp3.RequestBody
import java.io.File
import android.net.Uri
import java.lang.ref.WeakReference
import kotlin.Throws
import java.io.IOException
import okio.BufferedSink
import java.io.InputStream
import java.lang.ArithmeticException
import java.lang.Exception
import android.content.ContentResolver
import android.content.Context
import com.app.common.AppLogger
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull

class ProgressRequestBody(context: Context?, uploadInfo: UploadInfo, listener: ProgressCallback) :
    RequestBody() {
    interface ProgressCallback {
        fun onProgress(progress: Long, total: Long)
    }

    class UploadInfo(
        var contentUri: File, // File size in bytes
        var contentLength: Long,
        val mimeType: String,
        var fileUri: Uri,
        var context: Context
    )

    private val mContextRef: WeakReference<Context?>
    private val mUploadInfo: UploadInfo
    private val mListener: ProgressCallback

    init {
        mContextRef = WeakReference(context)
        mUploadInfo = uploadInfo
        mListener = listener
    }

    override fun contentType(): MediaType? {
        // NOTE: We are posting the upload as binary data so we don't need the true mimeType
        return mUploadInfo.mimeType.toMediaTypeOrNull()
        /*return MediaType.parse("application/octet-stream");*/
    }

    @Throws(IOException::class)
    override fun writeTo(sink: BufferedSink) {
        val fileLength = mUploadInfo.contentLength
        val buffers = ByteArray(UPLOAD_PROGRESS_BUFFER_SIZE)


        //InputStream inputStream = in();
        val inputStream = mUploadInfo.context.contentResolver.openInputStream(mUploadInfo.fileUri)

        //int maxBufferSize = 1 * 1024 * 1024;
        //int bytesAvailable = inputStream.available();

        /*int bufferSize = 1024;*/
        //int bufferSize = Math.min(bytesAvailable, maxBufferSize);
        // final byte[] buffers = new byte[bufferSize];
        var uploaded: Long = 0
        if (inputStream == null) {
            return
        }
        try {
            var read: Int
            while (inputStream.read(buffers).also { read = it } != -1) {
                try {
                    mListener.onProgress(uploaded, fileLength)
                    uploaded += read.toLong()
                    sink.write(buffers, 0, read)
                } catch (e: ArithmeticException) {
                    AppLogger.d(
                        "okhttp",
                        "Error getting input stream for upload" + e.localizedMessage
                    )
                    e.printStackTrace()
                } catch (e: Exception) {
                    e.printStackTrace()
                    AppLogger.d(
                        "okhttp",
                        "Error getting input stream for upload" + e.localizedMessage
                    )
                }
            }
        } finally {
            inputStream.close()
        }
    }

    /**
     * WARNING: You must override this function and return the file size or you will get errors
     */
    @Throws(IOException::class)
    override fun contentLength(): Long {
        return mUploadInfo.contentLength
    }

    @Throws(IOException::class)
    private fun `in`(): InputStream? {
        var stream: InputStream? = null
        try {
            stream = contentResolver!!.openInputStream(Uri.fromFile(mUploadInfo.contentUri))
        } catch (ex: Exception) {
            // AppLogger.d("okhttp", "Error getting input stream for upload" + ex.getLocalizedMessage());
        }
        return stream
    }

    private val contentResolver: ContentResolver?
        get() = if (mContextRef.get() != null) {
            mContextRef.get()!!.contentResolver
        } else null

    companion object {
        private const val UPLOAD_PROGRESS_BUFFER_SIZE = 10000
    }
}