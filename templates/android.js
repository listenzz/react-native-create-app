module.exports = platform => [
  {
    name: () => `android/settings.gradle`,
    content: ({ name }) => `rootProject.name = '${name}'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'	
`,
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
	ndkVersion rootProject.ext.ndkVersion

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
			universalApk true  // If true, also generate a universal APK
			include "arm64-v8a", "armeabi-v7a", "x86_64"
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
}

dependencies {
	implementation fileTree(dir: "libs", include: ["*.jar"])
	implementation "com.facebook.react:react-native:+"  // From node_modules
	implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.1.0"

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
	from configurations.implementation
	into 'libs'
}

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
`,
  },
  {
    name: () => `android/app/src/main/res/values/strings.xml`,
    content: ({ name }) => `<resources>
	<string name="app_name">${name}</string>
</resources>
  `,
  },
  {
    name: () => `android/app/src/main/AndroidManifest.xml`,
    content: ({ packageIdentifier }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
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
			android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
			android:launchMode="singleTask"
			android:windowSoftInputMode="adjustResize">
			<intent-filter>
				<action android:name="android.intent.action.MAIN" />
				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
		</activity>
	</application>

</manifest>`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/MainActivity.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier};
  
import com.reactnative.hybridnavigation.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {

}`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/MainApplication.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier};

import android.app.Application;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.reactnative.hybridnavigation.ReactBridgeManager;

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
		ReactBridgeManager bridgeManager = ReactBridgeManager.get();
		bridgeManager.install(getReactNativeHost());
		FLog.setMinimumLoggingLevel(FLog.INFO);
	}
	
}`,
  },
]
