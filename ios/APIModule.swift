//
//  API.swift
//  MovieApp
//
//  Created by Omar Salama on 07/05/2024.
//

@objc(APIModule)
class APIModule: NSObject{
  
  @objc(nativeFetch:authorization_token:callback:)
  func nativeFetch(_ url_string: String,_ authorization_token: String,_ callback:@escaping RCTResponseSenderBlock) {
    let url = URL(string: url_string)!

    var request = URLRequest(url: url)
    request.allHTTPHeaderFields = [
      "accept": "application/json", "Authorization": authorization_token]
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let data = data {
            if let value = String(data: data, encoding: String.Encoding.ascii) {
              callback([value])
            }
        } else if let error = error {
            print("HTTP Request Failed \(error)")
        }
    }
    task.resume()
  }
}
