package com.bsthun.w.chxpos.apidemo.account;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/account/login")
public class LoginEndpoint {
	@GetMapping(path = "/hello")
	public Map<String, String> _1() {
		Map<String, String> map = new HashMap<>();
		map.put("key", "value");
		map.put("foo", "bar");
		map.put("aa", LoginSessionHelper.signLogin(20, "hello", "hi"));
		return map;
	}
}