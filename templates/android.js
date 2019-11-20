module.exports = platform => [
  {
    name: () => `android/settings.gradle`,
    content: ({ name }) => `rootProject.name = '${name}'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'	
`
  },
  {
    name: () => `android/build.gradle`,
    content: () => `// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
	ext {
		buildToolsVersion = "28.0.3"
		minSdkVersion = 16
		compileSdkVersion = 28
		targetSdkVersion = 28
	}
	repositories {
		google()
		jcenter()
	}
	dependencies {
		classpath("com.android.tools.build:gradle:3.4.2")

		// NOTE: Do not place your application dependencies here; they belong
		// in the individual module build.gradle files
	}
}

allprojects {
	repositories {
		mavenLocal()
		maven {
			// All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
			url("$rootDir/../node_modules/react-native/android")
		}
		maven {
			// Android JSC is installed from npm
			url("$rootDir/../node_modules/jsc-android/dist")
		}

		google()
		jcenter()
		maven { url 'https://jitpack.io' }
	}
}
	`
  },
  {
    name: () => 'android/app/build.gradle',
    content: ({ packageIdentifier }) => `apply plugin: "com.android.application"

import com.android.build.OutputFile

project.ext.react = [
	entryFile: "index.js",
	enableHermes: false,  // clean and rebuild if changing
]

apply from: "../../node_modules/react-native/react.gradle"

def enableSeparateBuildPerCPUArchitecture = false
def enableProguardInReleaseBuilds = false
def jscFlavor = 'org.webkit:android-jsc:+'
def enableHermes = project.ext.react.get("enableHermes", false);

android {
	compileSdkVersion rootProject.ext.compileSdkVersion

	compileOptions {
		sourceCompatibility JavaVersion.VERSION_1_8
		targetCompatibility JavaVersion.VERSION_1_8
	}

	defaultConfig {
		applicationId "${packageIdentifier}"
		minSdkVersion rootProject.ext.minSdkVersion
		targetSdkVersion rootProject.ext.targetSdkVersion
		versionCode 1
		versionName "1.0"
	}
	splits {
		abi {
			reset()
			enable enableSeparateBuildPerCPUArchitecture
			universalApk false  // If true, also generate a universal APK
			include "armeabi-v7a", "x86", "arm64-v8a", "x86_64"
		}
	}
	signingConfigs {
		debug {
			storeFile file('debug.keystore')
			storePassword 'android'
			keyAlias 'androiddebugkey'
			keyPassword 'android'
		}
	}
	buildTypes {
		debug {
			signingConfig signingConfigs.debug
		}
		release {
			// Caution! In production, you need to generate your own keystore file.
			// see https://facebook.github.io/react-native/docs/signed-apk-android.
			signingConfig signingConfigs.debug
			minifyEnabled enableProguardInReleaseBuilds
			proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
		}
	}
	// applicationVariants are e.g. debug, release
	applicationVariants.all { variant ->
		variant.outputs.each { output ->
			// For each separate APK per architecture, set a unique version code as described here:
			// https://developer.android.com/studio/build/configure-apk-splits.html
			def versionCodes = ["armeabi-v7a": 1, "x86": 2, "arm64-v8a": 3, "x86_64": 4]
			def abi = output.getFilter(OutputFile.ABI)
			if (abi != null) {  // null for the universal-debug, universal-release variants
				output.versionCodeOverride =
						versionCodes.get(abi) * 1048576 + defaultConfig.versionCode
			}

		}
	}
}

dependencies {
	implementation fileTree(dir: "libs", include: ["*.jar"])
	implementation "com.facebook.react:react-native:+"  // From node_modules

	if (enableHermes) {
		def hermesPath = "../../node_modules/hermes-engine/android/";
		debugImplementation files(hermesPath + "hermes-debug.aar")
		releaseImplementation files(hermesPath + "hermes-release.aar")
	} else {
		implementation jscFlavor
	}
}

// Run this once to be able to run the application with BUCK
// puts all compile dependencies into folder libs for BUCK to use
task copyDownloadableDepsToLibs(type: Copy) {
	from configurations.compile
	into 'libs'
}

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
`
  },
  {
    name: () => `android/app/src/main/AndroidManifest.xml`,
    content: ({
      packageIdentifier
    }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	package="${packageIdentifier}">

	<uses-permission android:name="android.permission.INTERNET" />

	<application
		android:name=".MainApplication"
		android:label="@string/app_name"
		android:icon="@mipmap/ic_launcher"
		android:roundIcon="@mipmap/ic_launcher_round"
		android:allowBackup="false"
		android:theme="@style/AppTheme">

		<meta-data
			android:name="android.max_aspect"
			android:value="2.4" />
		<meta-data
			android:name="android.notch_support"
			android:value="true" />
		<meta-data
			android:name="notch.config"
			android:value="portrait|landscape" />

		<activity
			android:name=".MainActivity"
			android:label="@string/app_name"
			android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
			android:windowSoftInputMode="adjustResize">
			<intent-filter>
				<action android:name="android.intent.action.MAIN" />
				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
		</activity>
		<activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
	</application>

</manifest>`
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/MainActivity.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier};
  
import com.navigationhybrid.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {

}`
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/MainApplication.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier};

import android.app.Application;
import android.content.Context;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.navigationhybrid.ReactBridgeManager;

public class MainApplication extends Application implements ReactApplication {

	private final ReactNativeHost mReactNativeHost =
		new ReactNativeHost(this) {
			@Override
			public boolean getUseDeveloperSupport() {
				return BuildConfig.DEBUG;
			}

			@Override
			protected List<ReactPackage> getPackages() {
				@SuppressWarnings("UnnecessaryLocalVariable")
				List<ReactPackage> packages = new PackageList(this).getPackages();
				return packages;
			}

			@Override
			protected String getJSMainModuleName() {
				return "index";
			}
		};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
		initializeFlipper(this); // Remove this line if you don't want Flipper enabled
		ReactBridgeManager bridgeManager = ReactBridgeManager.get();
		bridgeManager.install(getReactNativeHost());
		FLog.setMinimumLoggingLevel(FLog.INFO);
	}

	/**
	 * Loads Flipper in React Native templates.
	 *
	 * @param context
	 */
	private static void initializeFlipper(Context context) {
		if (BuildConfig.DEBUG) {
			try {
				/*
				We use reflection here to pick up the class that initializes Flipper,
				since Flipper library is not available in release mode
				*/
				Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
				aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (NoSuchMethodException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
		}
	}
}`
  }
];
