//
//  ContentView.swift
//  EnvisMob
//
//  Created by Titus Lowe on 10/2/23.
//

import SwiftUI
import SwiftNFC

struct ScaleButtonUp: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 1.05 : 1)
    }
}

struct ContentView: View {
    // MARK: - You can use either Reader / Writer or both in your application.
    @ObservedObject private var NFCR = NFCReader()
    
    var body: some View {
        
        VStack {
            
            TextEditor(text: $NFCR.msg)
                    .background(Color.accentColor.opacity(0.5))
                    .background(.clear)
                    .frame(height: 50)
                    .ignoresSafeArea(.all)
            
            ZStack {
                // MARK: Background
                LinearGradient(gradient: Gradient(colors: [.purple, .indigo]), startPoint: .top, endPoint: .bottom)
    //            Color(.systemIndigo)
                
                Button( action: { read() }) {
                    ZStack {
                        Circle()
                            .frame(width: 700, height: 700)
                            .foregroundColor(.white.opacity(0.3))
                        
                        Circle()
                            .frame(width: 500, height: 500)
                            .foregroundColor(.white.opacity(0.2))
                        
                        Circle()
                            .frame(width: 300, height: 300)
                            .foregroundColor(.white.opacity(0.1))
                        
                        Image(systemName: "wave.3.left.circle.fill")
                            .font(.system(size: 100))
                            .imageScale(.large)
                            .foregroundColor(.white.opacity(0.9))
                            .shadow(radius: 0.2)
                    }
                }
                .buttonStyle(ScaleButtonUp())
                
            }
            .ignoresSafeArea(.all)
            
        }
        
    }
    
    func read() {
        NFCR.read()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
