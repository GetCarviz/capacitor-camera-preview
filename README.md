<h1 align="center">📷</h1>

<h3 align="center">Capacitor Camera Preview</h3>
<p align="center"><strong><code>@getcarviz/capacitor-camera-preview</code></strong></p>
<br>
<p align="center"><strong>CAPACITOR 8</strong></p><br>

<p align="center">
  Capacitor plugin that allows camera interaction from Javascript and HTML<br>(based on <a href="https://github.com/capacitor-community/camera-preview" target="_blank">@capacitor-community/camera-preview</a> which itself was based on cordova-plugin-camera-preview).

  This fork focuses on the camera functionality of the plugin by enabling high resolution photo output and better focus handling for new iPhone models.
</p>

<br>

Version 8 of this plugin requires Capacitor 8.

**PR's are greatly appreciated.**


# Installation

This package is published on GitHub Packages, which always requires a token, even to install.

1. Give your GitHub CLI token access to packages, then expose it to npm/pnpm (e.g. in `~/.zshrc`):

   ```bash
   gh auth refresh -s write:packages      # write:packages includes read
   export NODE_AUTH_TOKEN="$(gh auth token 2>/dev/null)"
   ```

2. Add an `.npmrc` to the consuming project (safe to commit, it only references the variable):

   ```
   @getcarviz:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
   ```

3. Install:

   ```
   npm install @getcarviz/capacitor-camera-preview
   ```

Check your setup with `npm whoami --registry=https://npm.pkg.github.com`. In GitHub Actions, use `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` with `permissions: packages: read`, and grant the consuming repo read access in the package settings (**Manage Actions access**).

Then run
```
npx cap sync
```

## Extra Android installation steps
**Important** `camera-preview` 3+ requires Gradle 8. If you are using Gradle 4, please use [version 2](https://github.com/capacitor-community/camera-preview/tree/v2.1.0) of this plugin.

Open `android/app/src/main/AndroidManifest.xml` and above the closing `</manifest>` tag add this line to request the CAMERA permission:
```xml
<uses-permission android:name="android.permission.CAMERA" />
```
For more help consult the [Capacitor docs](https://capacitorjs.com/docs/android/configuration#configuring-androidmanifestxml).

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `androidxExifInterfaceVersion`: version of `androidx.exifinterface:exifinterface` (default: `1.3.6`)

## Extra iOS installation steps

You will need to add two permissions to `Info.plist`. Follow the [Capacitor docs](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) and add permissions with the raw keys `NSCameraUsageDescription`.

## Extra Web installation steps

Add `import { CameraPreview } from '@capacitor-community/camera-preview';` in the file where you want to use the plugin.

then in html add `<div id="cameraPreview"></div>`

and `CameraPreview.start({ parent: "cameraPreview"});` will work.


# Methods

### start(options)

Starts the camera preview instance.
<br>

| Option                       | values       | descriptions                                                                                                                                                  |
|------------------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| position                     | front \ rear | Show front or rear camera when start the preview. Defaults to front                                                                                           |
| width                        | number       | The preview width in pixels, default window.screen.width (applicable to the android and ios platforms only)                                                   |
| height                       | number       | The preview height in pixels, default window.screen.height  (applicable to the android and ios platforms only)                                                |
| x                            | number       | The x origin, default 0 (applicable to the android and ios platforms only)                                                                                    |
| y                            | number       | The y origin, default 0 (applicable to the android and ios platforms only)                                                                                    |
| toBack                       | boolean      | Brings your html in front of your preview, default false (applicable to the android and ios platforms only)                                                   |
| paddingBottom                | number       | The preview bottom padding in pixes. Useful to keep the appropriate preview sizes when orientation changes (applicable to the android and ios platforms only) |
| rotateWhenOrientationChanged | boolean      | Rotate preview when orientation changes (applicable to the ios platforms only; default value is true)                                                         |
| storeToFile                  | boolean      | Capture images to a file and return back the file path instead of returning base64 encoded data, default false.                                               |
| disableExifHeaderStripping   | boolean      | Disable automatic rotation of the image, and let the browser deal with it, default true (applicable to the android and ios platforms only)                    |
| enableHighResolution         | boolean      | Defaults to false - iOS only - Activate high resolution image capture so that output images are from the highest resolution on the device (photo quality)     |
| lockAndroidOrientation       | boolean      | Locks device orientation when camera is showing, default false. (applicable to Android only)                                                                  |
| enableOpacity                | boolean      | Make the camera preview see-through. Ideal for augmented reality uses. Default false (applicable to Android and web only)                                     |
| enableZoom                   | boolean      | Set if you can pinch to zoom. Default false (applicable to the android and ios platforms only)                                                                |

```javascript
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';

const cameraPreviewOptions: CameraPreviewOptions = {
  position: 'rear',
  height: 1920,
  width: 1080
};
CameraPreview.start(cameraPreviewOptions);
```

Remember to add the style below on your app's HTML or body element:

```css
ion-content {
  --background: transparent;
}
```

Take into account that this will make transparent all ion-content on application, if you want to show camera preview only in one page, just add a custom class to your ion-content and make it transparent:

```css
.my-custom-camera-preview-content {
  --background: transparent;
}
```

If the camera preview is not displaying after applying the above styles, apply transparent background color to the root div element of the parent component
Ex: VueJS >> App.vue component
```html
<template>
  <ion-app id="app">
    <ion-router-outlet />
  </ion-app>
</template>

<style>
#app {
  background-color: transparent !important;
}
<style>
```


### stop()

<info>Stops the camera preview instance.</info><br/>

```javascript
CameraPreview.stop();
```

### flip()
<info>Switch between rear and front camera only for android and ios, web is not supported</info>
```javascript
CameraPreview.flip()
```

### capture(options)

| Option               | values        | descriptions                                                                                    |
|----------------------|---------------|-------------------------------------------------------------------------------------------------|
| quality              | number        | (optional) The picture quality, 0 - 100, default 85                                             |
| width                | number        | (optional) The picture width, best fit respecting the aspect ratio of the device (Android only) |
| height               | number        | (optional) The picture height, best fit the aspect ratio of the device (Android only)           |

<info>Take the picture. If width and height are not specified or are 0 it will use the defaults. If width and height are specified, it will choose a supported photo size that is closest to width and height specified and has closest aspect ratio to the preview (only on Android). The argument `quality` defaults to `85` and specifies the quality/compression value: `0=max compression`, `100=max quality`.</info>

```javascript
import { CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';

const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
  quality: 50
};

const result = await CameraPreview.capture(cameraPreviewPictureOptions);
const base64PictureData = result.value;
```

### captureSample(options)

| Option   | values        | descriptions                                                         |
|----------|---------------|----------------------------------------------------------------------|
| quality  | number        | (optional) The picture quality, 0 - 100, default 85                  |

<info>Captures a sample image from the video stream. Only for Android and iOS, web implementation falls back to `capture` method. This can be used to perform real-time analysis on the current frame in the video. The argument `quality` defaults to `85` and specifies the quality/compression value: `0=max compression`, `100=max quality`.</info><br/>

```javascript
import { CameraSampleOptions } from '@capacitor-community/camera-preview';

const cameraSampleOptions: CameraSampleOptions = {
  quality: 50
};

const result = await CameraPreview.captureSample(cameraSampleOptions);
const base64PictureData = result.value;
```

### getSupportedFlashModes()

<info>Get the flash modes supported by the camera device currently started. Returns an array containing supported flash modes. See <code>[FLASH_MODE](#camera_Settings.FlashMode)</code> for possible values that can be returned</info><br/>

```javascript
import { CameraPreviewFlashMode } from '@capacitor-community/camera-preview';

const flashModes = await CameraPreview.getSupportedFlashModes();
const supportedFlashModes: CameraPreviewFlashMode[] = flashModes.result;
```
### setFlashMode(options)

<info>Set the flash mode. See <code>[FLASH_MODE](#camera_Settings.FlashMode)</code> for details about the possible values for flashMode.</info><br/>

```javascript
const CameraPreviewFlashMode: CameraPreviewFlashMode = 'torch';

CameraPreview.setFlashMode(cameraPreviewFlashMode);
```

### setOpacity(options: CameraOpacityOptions): Promise<{}>;  ---- ANDROID only

<info>Set the opacity for the camera preview</info><br/>

```javascript
const myCamera = CameraPreview.start({enableOpacity: true});
myCamera.setOpacity({opacity: 0.4});
```

# Settings

<a name="camera_Settings.FlashMode"></a>

### FLASH_MODE

<info>Flash mode settings:</info><br/>

| Name    | Type    | Default | Note          |
| ------- | ------- | ------- | ------------- |
| OFF     | string  | off     |               |
| ON      | string  | on      |               |
| AUTO    | string  | auto    |               |
| RED_EYE | string  | red-eye | Android Only  |
| TORCH   | string  | torch   |               |

# Publishing

Releases are published to GitHub Packages by the **Publish Released Package** workflow, using `GITHUB_TOKEN`.

1. Bump `version` in `package.json` (e.g. `npm version patch --no-git-tag-version`) and merge it into `main`.
2. Create a GitHub release with the matching tag (e.g. `v8.0.5`) on `main`. Leave **Set as a pre-release** unchecked: the workflow only runs on full releases.
3. Check that the workflow passes and that the new version shows up under **Packages** on the repo page.

A published version can't be overwritten: fix forward with a new version.

## Testing a pre-release

To try a build without using up the final version number, publish a pre-release from your machine (with the `.npmrc` and token from [Installation](#installation)):

```bash
npm version 8.0.5-beta.0 --no-git-tag-version   # next attempt: npm version prerelease --preid beta --no-git-tag-version
npm install --ignore-scripts
npm publish --tag beta                           # prepublishOnly builds dist/ first
git restore package.json package-lock.json
```

`^8.0.5` ranges never resolve to a pre-release; install it explicitly with `@getcarviz/capacitor-camera-preview@beta`.
