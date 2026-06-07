package com.chessinsights.insights;

import com.chessinsights.insights.dto.InsightsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(InsightsService insightsService) {
        this.insightsService = insightsService;
    }

    @GetMapping("/{username}")
    public InsightsResponse getInsights(@PathVariable String username) {
        return insightsService.getInsights(username);
    }
}
