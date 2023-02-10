//
//  Firestore.swift
//  EnvisMob
//
//  Created by Joshua Tan on 10/2/23.
//

import SwiftUI
import FirebaseCore


class FirebaseDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()

    return true
  }
}
