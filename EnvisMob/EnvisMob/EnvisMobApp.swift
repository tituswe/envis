//
//  EnvisMobApp.swift
//  EnvisMob
//
//  Created by Titus Lowe on 10/2/23.
//

import SwiftUI

@main
struct EnvisMobApp: App {
    // register app delegate for Firebase setup
    @UIApplicationDelegateAdaptor(FirebaseDelegate.self) var delegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
//            TextToSpeech()
        }
    }
}
