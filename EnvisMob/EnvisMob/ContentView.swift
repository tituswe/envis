//
//  ContentView.swift
//  EnvisMob
//
//  Created by Titus Lowe on 10/2/23.
//

import SwiftUI
import SwiftNFC
import AVFoundation
import AVKit

//struct ScaleButtonUp: ButtonStyle {
//    func makeBody(configuration: Configuration) -> some View {
//        configuration.label
//            .scaleEffect(configuration.isPressed ? 1.05 : 1)
//    }
//}

struct ContentView: View {
    // MARK: - You can use either Reader / Writer or both in your application.
    @ObservedObject private var NFCR = NFCReader()
    
    @State private var isAnimating = false
    
    @State private var isTapped = false
    
    @State private var message = "Long Press to Scan a puck."
    
    let synthesizer = AVSpeechSynthesizer()
    
    var body: some View {
        
        VStack {

            ZStack {
                // MARK: Background
                LinearGradient(gradient: Gradient(colors: [.purple, .indigo]), startPoint: .top, endPoint: .bottom)
                
                Button( action: {}) {
                    ZStack {
                        Circle()
                            .frame(width: 700, height: 700)
                            .foregroundColor(.white.opacity(0.3))
                            .scaleEffect(isTapped ? 0.7 : 1)
                        
                        Circle()
                            .frame(width: 500, height: 500)
                            .foregroundColor(.white.opacity(0.2))
                            .scaleEffect(isTapped ? 0.9 : 1)
                        
                        Circle()
                            .frame(width: 300, height: 300)
                            .foregroundColor(.white.opacity(0.1))
                            .scaleEffect(isTapped ? 1.1 : 1)
                        
                        Image(systemName: "wave.3.left.circle.fill")
                            .font(.system(size: 100))
                            .imageScale(.large)
                            .foregroundColor(.white.opacity(0.9))
                            .shadow(radius: 0.2)
                            .scaleEffect(isTapped ? 1.3 : 1)
                    }
                    .onTapGesture {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                            isTapped = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                                isTapped = false
                            }
                            
                            textToSpeech()
                        }
                    }
                    .onLongPressGesture(minimumDuration: 0.2) {
                        withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                            isTapped = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                                isTapped = false
                            }
                            
                            read()
                            vibrate()
                            sound()
                        }
                    }

                }
                
            }
            .ignoresSafeArea(.all)
            
        }
        
    }
    
    func read() {
        NFCR.read()
        if (NFCR.msg != "Scan to read or Edit here to write...") {
            let path = NFCR.msg
            // TODO: let result = fetchData(path : String)
            // TODO: message = result
        }
    }
    
    func vibrate() {
        let impact = UIImpactFeedbackGenerator(style: .heavy)
        impact.impactOccurred(intensity: 1.0)
    }
    
    func sound() {
        let systemSoundID: SystemSoundID = 4095
        AudioServicesPlaySystemSound(systemSoundID)
    }
    
    func textToSpeech() {
        let utterance = AVSpeechUtterance(string: message)
        utterance.rate = 0.5
        utterance.pitchMultiplier = 0.8
        utterance.postUtteranceDelay = 0.2
        utterance.volume = 0.8
        
        let voice = AVSpeechSynthesisVoice()
        
        utterance.voice = voice
        
        synthesizer.speak(utterance)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
