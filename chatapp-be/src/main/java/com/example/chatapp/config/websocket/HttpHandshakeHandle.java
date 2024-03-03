package com.example.chatapp.config.websocket;

import com.example.chatapp.config.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Xử lí request handshake websocket => tao Principal dua trên id đã lưu trong cookies
 */
@Component("httpHandshakeHandle")
public class HttpHandshakeHandle extends DefaultHandshakeHandler {

    private static final Logger logger = LoggerFactory.getLogger(HttpServletRequest.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {

       

        List<String> cookies = request.getHeaders().get(HttpHeaders.COOKIE);

        logger.info("handshake ws cookie {}",cookies);
        // cookies khác null ta tiến hành tạo principal theo id
        if(cookies != null ){

            Optional<String> user = cookies.stream().filter(s -> s.contains("user_id")).findFirst();
            String id = user.orElseThrow().split("=")[1];
            logger.info("http handshake {}",id);
            return ()-> id;
            
        }

        return super.determineUser(request, wsHandler, attributes);

    }
}
