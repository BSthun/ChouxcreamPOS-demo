import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.1-SNAPSHOT"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.5.0"
	kotlin("plugin.spring") version "1.5.0"
}

group = "com.bsthun.w.chxpos"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_16

repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://repo.spring.io/snapshot") }
	maven { url = uri("https://jcenter.bintray.com") }
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-mail")
	implementation("org.springframework.boot:spring-boot-configuration-processor")
	implementation("com.goebl:david-webb:1.3.0")
	implementation("io.jsonwebtoken:jjwt-api:0.11.2")
	implementation("io.jsonwebtoken:jjwt-impl:0.11.2")
	implementation("io.jsonwebtoken:jjwt-jackson:0.11.2")
	implementation("org.json:json:20210307")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("com.warrenstrange:googleauth:1.4.0")
	implementation("com.timgroup:jgravatar:1.2")
	implementation("mysql:mysql-connector-java:8.0.24")
	implementation("commons-validator:commons-validator:1.7")
	implementation("commons-codec:commons-codec:1.15")
	implementation("commons-dbcp:commons-dbcp:1.4")
	implementation("org.apache.commons:commons-lang3:3.12.0")
	implementation("org.funktionale:funktionale-all:1.2")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "16"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
