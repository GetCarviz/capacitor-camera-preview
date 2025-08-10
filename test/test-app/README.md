# Camera Preview Test App 🎥

This is a test application to verify the `captureSample` functionality of the camera preview plugin.

## Quick Start

1. **Sync and Build**:
   ```bash
   npx cap sync ios
   npx cap open ios
   ```

2. **Run in Xcode**:
   - Build and run on a physical iOS device (camera doesn't work in simulator)

## What to Test

### 📸 **Regular Capture vs Sample Capture**

The app provides buttons to test both methods:

- **🔴 Regular Capture**: Uses `capture()` - should make camera sound
- **🟢 Sample Capture**: Uses `captureSample()` - should be completely silent

### ✅ **Expected Results**

After clicking "🤫 Test captureSample() - SILENT":
- ✅ **No camera sound** - completely silent capture
- ✅ **Full image** - should show the complete camera view (not just 10% from top)
- ✅ **Proper orientation** - image should match the preview orientation
- ✅ **Base64 data** - should return valid base64 string

### 🔍 **Comparison Test**

Use the "🔍 Compare Both Methods" button to:
- Take both types of photos side by side
- Compare image quality and completeness
- Verify that sample capture is silent while regular capture makes sound

## Troubleshooting

### Plugin Not Loading
If you see "Plugin not available", make sure:
- You're running on a physical device
- The plugin was built successfully
- Try cleaning and rebuilding the project

### Camera Permission
- The app will request camera permission on first use
- Make sure to grant permission for testing

### Image Issues
If `captureSample` returns:
- **Blank image**: Check the video data output configuration
- **Cropped image**: Verify the CIImage extent is being used correctly
- **Wrong orientation**: Ensure orientation fixes are applied

## Test Cases

1. **Basic Functionality**:
   - Start camera preview
   - Test regular capture (with sound)
   - Test sample capture (silent)

2. **Orientation Testing**:
   - Test in portrait mode
   - Rotate to landscape and test again
   - Both captures should handle orientation correctly

3. **Comparison Testing**:
   - Take both types of photos
   - Compare for completeness and quality
   - Verify sound behavior

## Debug Information

The app shows:
- Base64 data length (should be substantial for full images)
- Data preview (first 50 characters)
- Visual comparison of captured images
- Status messages for each operation

---

**Note**: This test app is specifically designed to verify that the `captureSample` method returns the full camera image in base64 format without any camera sounds or animations. 