//
//  API.m
//  MovieApp
//
//  Created by Omar Salama on 07/05/2024.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(APIModule, NSObject)
RCT_EXTERN_METHOD(nativeFetch: (NSString *)url_string authorization_token:(NSString *)authorization_token callback: (RCTResponseSenderBlock *)callback)
@end

