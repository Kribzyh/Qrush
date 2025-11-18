package org.qrush.ticketing_system.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleID;

    private String roleName;

    // Constructors
    public RoleEntity() {}

    public RoleEntity(Long roleID, String roleName) {
        this.roleID = roleID;
        this.roleName = roleName;
    }

    // Getters and Setters
    public Long getRoleID() {
        return roleID;
    }

    public void setRoleID(Long roleID) {
        this.roleID = roleID;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
