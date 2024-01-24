package project.forAll.util;

import com.google.gson.Gson;


public class TestUtil {
    private static final Gson gson = new Gson();
    public static String asJsonString(final Object obj) {
        return gson.toJson(obj);
    }
}
