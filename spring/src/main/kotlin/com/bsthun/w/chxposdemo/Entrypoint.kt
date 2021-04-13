package com.bsthun.w.chxposdemo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class Entrypoint

fun main(args: Array<String>) {
	runApplication<Entrypoint>(*args)
}