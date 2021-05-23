package com.bsthun.w.chxpos.apidemo.utils

import com.timgroup.jgravatar.Gravatar
import com.timgroup.jgravatar.GravatarRating
import com.timgroup.jgravatar.GravatarDefaultImage
import com.bsthun.w.chxpos.apidemo.utils.GravatarUtil

object GravatarUtil {
	private val GRAVATAR = Gravatar()
		.setSize(128)
		.setRating(GravatarRating.GENERAL_AUDIENCES)
		.setDefaultImage(GravatarDefaultImage.RETRO)
	
	fun getUrl(email: String): String {
		return GRAVATAR.getUrl(email)
	}
}