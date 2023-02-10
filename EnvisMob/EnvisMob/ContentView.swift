import SwiftUI
import SwiftNFC
import AVFoundation
import AVKit
import FirebaseCore
import FirebaseFirestore


struct ContentView: View {
    // MARK: - You can use either Reader / Writer or both in your application.
    @ObservedObject private var NFCR = NFCReader()
    
    @State private var isAnimating = false
    
    @State private var isTapped = false
    
    let synthesizer = AVSpeechSynthesizer()
    
    var body: some View {
        
        VStack {

            ZStack {
                // MARK: Background
                
                TextEditor(text: $NFCR.msg)
                    .foregroundColor(.clear)
                
                LinearGradient(
                    gradient: Gradient(
                        colors: [
                            Color(hex: "f4a5ae") ?? .indigo,
                            Color(hex: "531cb3") ?? .purple
                        ]), startPoint: .topLeading, endPoint: .bottomTrailing)
                
                Button( action: {}) {
                    ZStack {
                        Circle()
                            .frame(width: 700, height: 700)
                            .foregroundColor(.white.opacity(0.15))
                            .scaleEffect(isTapped ? 0.7 : 1)
                        Circle()
                            .frame(width: 500, height: 500)
                            .foregroundColor(.white.opacity(0.05))
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
                            if (NFCR.msg == "Scan to read or Edit here to write...") {
                                welcomeSpeech()
                            } else {
                                textToSpeech()
                            }
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
    }
    
    func fetchData(completion: @escaping(String) -> Void) {
        if (NFCR.msg != "Scan to read or Edit here to write...") {
            let path = NFCR.msg
            
            let pathArr = path.split(separator: "/")
            let enterprise = String.init(describing: pathArr[1])
            let puckInstance = String.init(describing: pathArr[2])
            
            let db = Firestore.firestore()
            let docRef = db.collection(enterprise).document(puckInstance)
            
            docRef.getDocument { (document, error) in
                if let document = document, document.exists {
                    let dataDesciption = document.data()!["message"].map(String.init(describing:)) ?? "nil"
                    completion(dataDesciption)
                } else {
                    print("Document does not exist")
                }
            }
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
        fetchData { dataDescription in
            let utterance = AVSpeechUtterance(string: dataDescription)
            utterance.rate = 0.5
            utterance.pitchMultiplier = 0.8
            utterance.postUtteranceDelay = 0.2
            utterance.volume = 0.8
            
            let voice = AVSpeechSynthesisVoice()
            
            utterance.voice = voice
            
            synthesizer.speak(utterance)
        }
    }
    
    func welcomeSpeech() {
        let utterance = AVSpeechUtterance(string: "Welcome to Envis! Long press anywhere to scan a puck, then, tap anywhere once you're ready to hear your message.")
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
