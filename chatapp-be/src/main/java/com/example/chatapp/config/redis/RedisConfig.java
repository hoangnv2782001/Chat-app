package com.example.chatapp.config.redis;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableCaching
public class RedisConfig {
	
//	@Bean
//	public JedisConnectionFactory jedisConnectionFactory() {
//	    return new JedisConnectionFactory();
//	}
//   
    @Bean
    @Primary
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
//        template.setKeySerializer(new StringRedisSerializer());
//        template.setValueSerializer(new StringRedisSerializer());
//        template.setStringSerializer(new StringRedisSerializer());
//        template.afterPropertiesSet();
        return template;
    }
}