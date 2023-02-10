import SwiftUI

@main
struct EnvisMobApp: App {
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(FirebaseDelegate.self) var delegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
