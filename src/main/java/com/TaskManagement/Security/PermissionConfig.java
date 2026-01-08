package com.TaskManagement.Security;

import java.util.*;

import com.TaskManagement.Enum.Permission;
import com.TaskManagement.Enum.Role;

public class PermissionConfig {

    private static final Map<Role, Set<Permission>> ROLE_PERMISSIONS = new HashMap<>();

    static {
        ROLE_PERMISSIONS.put(Role.ADMIN, new HashSet<>(Arrays.asList(
                Permission.ISSUE_VIEW,
                Permission.ISSUE_CREATE,
                Permission.ISSUE_EDIT,
                Permission.ISSUE_DELETE,
                Permission.COMMENT_ADD,
                Permission.COMMENT_DELETE,
                Permission.USER_MANAGE
        )));

        ROLE_PERMISSIONS.put(Role.MANAGER, new HashSet<>(Arrays.asList(
                Permission.ISSUE_VIEW,
                Permission.ISSUE_CREATE,
                Permission.ISSUE_EDIT,
                Permission.COMMENT_ADD
        )));

        ROLE_PERMISSIONS.put(Role.DEVELOPER, new HashSet<>(Arrays.asList(
                Permission.ISSUE_VIEW,
                Permission.ISSUE_EDIT,
                Permission.COMMENT_ADD
        )));

        ROLE_PERMISSIONS.put(Role.TESTER, new HashSet<>(Arrays.asList(
                Permission.ISSUE_VIEW,
                Permission.COMMENT_ADD
        )));
    }

    public static Set<Permission> getPermissions(Role role) {
        return ROLE_PERMISSIONS.getOrDefault(role, Collections.emptySet());
    }

    public static Map<Role, Set<Permission>> getAllRolePermissions() {
        return ROLE_PERMISSIONS;
    }
}
