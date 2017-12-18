#include <windows.h>
#include <iostream>
#include <string>
#include <node.h>

bool GetActiveProcessName(TCHAR *buffer, DWORD cchLen) {
    HWND fg = GetForegroundWindow();
    if (fg)
    {
        DWORD pid;
        GetWindowThreadProcessId(fg, &pid);
        HANDLE hProcess = OpenProcess(PROCESS_QUERY_INFORMATION, FALSE, pid);
        if (hProcess)
        {
            BOOL ret = QueryFullProcessImageName(hProcess, 0, buffer, &cchLen);
            //here you can trim process name if necessary
            CloseHandle(hProcess);
            return (ret != FALSE);
        }
    }
    return false;
}


namespace NodeWinNative {

  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::Boolean;
  using v8::Array;
  using v8::String;
  using v8::Number;
  using v8::Value;
  using std::string;

  void keyStroke (const FunctionCallbackInfo<Value>& args) {

    Isolate* isolate = args.GetIsolate();
    int virtualKeyCode = args[0]->NumberValue();

    // This structure will be used to create the keyboard
    // input event.
    INPUT ip;

    // Sleep(100);

    // Set up a generic keyboard event.
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0; // hardware scan code for key
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    // Press the "A" key
    // ip.ki.wVk = 0x41; // virtual-key code for the "a" key
    ip.ki.wVk = virtualKeyCode; // virtual-key code for the "a" key
    ip.ki.dwFlags = 0; // 0 for key press
    SendInput(1, &ip, sizeof(INPUT));

    // Release the "A" key
    ip.ki.dwFlags = KEYEVENTF_KEYUP; // KEYEVENTF_KEYUP for key release
    SendInput(1, &ip, sizeof(INPUT));

  }

  void keyDown (const FunctionCallbackInfo<Value>& args) {

    Isolate* isolate = args.GetIsolate();
    int virtualKeyCode = args[0]->NumberValue();

    // This structure will be used to create the keyboard
    // input event.
    INPUT ip;

    // Sleep(100);

    // Set up a generic keyboard event.
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0; // hardware scan code for key
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    // Press the "A" key
    // ip.ki.wVk = 0x41; // virtual-key code for the "a" key
    ip.ki.wVk = virtualKeyCode; // virtual-key code for the "a" key
    ip.ki.dwFlags = 0; // 0 for key press
    SendInput(1, &ip, sizeof(INPUT));

  }

  void keyUp (const FunctionCallbackInfo<Value>& args) {

    Isolate* isolate = args.GetIsolate();
    int virtualKeyCode = args[0]->NumberValue();

    // This structure will be used to create the keyboard
    // input event.
    INPUT ip;

    // Sleep(100);
    // Set up a generic keyboard event.
    ip.type = INPUT_KEYBOARD;
    ip.ki.wScan = 0; // hardware scan code for key
    ip.ki.time = 0;
    ip.ki.dwExtraInfo = 0;

    // Release the "A" key
    ip.ki.wVk = virtualKeyCode;
    ip.ki.dwFlags = KEYEVENTF_KEYUP; // KEYEVENTF_KEYUP for key release
    SendInput(1, &ip, sizeof(INPUT));

  }

  void getActiveWindowTitle (const FunctionCallbackInfo<Value>& args) {

      char windowTitle[512];
      char processName[512];
      HWND hwnd=GetForegroundWindow();

      GetWindowText(hwnd,windowTitle,sizeof(windowTitle));
      GetActiveProcessName(processName, 512);

      Isolate* isolate = args.GetIsolate();
      Local<Object> obj = Object::New(isolate);
      Local<String> title = String::NewFromUtf8(isolate, windowTitle);
      Local<String> process = String::NewFromUtf8(isolate, processName);
      obj->Set(String::NewFromUtf8(isolate, "window"), title);
      obj->Set(String::NewFromUtf8(isolate, "process"), process);
      args.GetReturnValue().Set(obj);

  }

  void keyIsDown (const FunctionCallbackInfo<Value>& args) {

      Isolate* isolate = args.GetIsolate();
      int virtualKeyCode = args[0]->NumberValue();

      if(GetKeyState(virtualKeyCode) & 0x8000) {
        args.GetReturnValue().Set(Boolean::New(isolate, 1));
      } else {
        args.GetReturnValue().Set(Boolean::New(isolate, 0));
      }

  }

  void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "keyIsDown", keyIsDown);
    NODE_SET_METHOD(exports, "keyDown", keyDown);
    NODE_SET_METHOD(exports, "keyUp", keyUp);
    NODE_SET_METHOD(exports, "keyStroke", keyStroke);
    NODE_SET_METHOD(exports, "getActiveWindowTitle", getActiveWindowTitle);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init);

}  // namespace noise
